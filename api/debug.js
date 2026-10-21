// Vercel Serverless Function: /api/debug
// Secure backend proxy for AI Debugger using OpenRouter
// Zero API Key exposure to client • Rate limited • Input sanitized

const ipRequestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // Max 30 debug requests per minute per IP

function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record || now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    ipRequestCounts.set(ip, { count: 1, startTime: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // Rate limiting check
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment before trying again.' });
  }

  const { language, code, errorText } = req.body || {};

  // Input Validation & Security Sanitization
  if (!language || typeof language !== 'string' || language.length > 50) {
    return res.status(400).json({ error: 'Invalid or missing language parameter.' });
  }

  if (typeof code !== 'string' || code.length > 60000) {
    return res.status(400).json({ error: 'Code parameter must be a string under 60KB.' });
  }

  if (typeof errorText !== 'string' || errorText.length > 20000) {
    return res.status(400).json({ error: 'errorText parameter must be a string under 20KB.' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENROUTER_API_KEY is not configured on server.' });
  }

  const systemPrompt = `You are a world-class compiler and runtime code debugger.
Your task is to analyze the user's source code and the exact compiler or runtime error.
Give a distinct, deep, and customized diagnosis specifically tailored to their exact code snippet.

Return strictly a valid JSON object matching this schema:
{
  "type": "Precise Distinct Title (e.g. NameError: Typo in Function 'prin' -> 'print')",
  "line": integer or null (the exact 1-based line number in user code causing the error),
  "explanation": "Clear, distinct, plain-English explanation of exactly what went wrong in this code",
  "cause": "Deep root cause explanation of why the compiler or runtime failed on this specific token or line",
  "originalLine": "the exact offending line of code",
  "suggestedLine": "the exact corrected line of code",
  "fixCode": "the complete source code with the fix cleanly applied, ready to compile and run without error",
  "tip": "A practical, specific tip to avoid this exact bug in the future"
}`;

  const userPrompt = `Language: ${language}
Source Code:
\`\`\`${language}
${code}
\`\`\`

Compiler / Runtime Output:
\`\`\`
${errorText}
\`\`\``;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://jdcodecompiler.vercel.app',
        'X-Title': 'JD COMPILER'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 800,
        temperature: 0.1,
        response_format: { type: 'json_object' }
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!openRouterRes.ok) {
      const errBody = await openRouterRes.text();
      console.error('OpenRouter error response:', openRouterRes.status, errBody);
      return res.status(openRouterRes.status).json({ 
        error: 'AI Provider returned an error', 
        status: openRouterRes.status,
        details: errBody
      });
    }

    const completion = await openRouterRes.json();
    const rawContent = completion?.choices?.[0]?.message?.content;

    if (!rawContent) {
      return res.status(502).json({ error: 'Empty response from AI engine.' });
    }

    let parsed;
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      // Extract json from markdown block if needed
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse AI JSON response');
      }
    }

    return res.status(200).json({
      success: true,
      analysis: {
        type: parsed.type || `${language.toUpperCase()} Error Diagnosis`,
        line: typeof parsed.line === 'number' ? parsed.line : null,
        explanation: parsed.explanation || '',
        cause: parsed.cause || '',
        originalLine: parsed.originalLine || '',
        suggestedLine: parsed.suggestedLine || '',
        fixCode: parsed.fixCode || null,
        tip: parsed.tip || '',
        isAI: true
      }
    });
  } catch (err) {
    console.error('AI Debugger API error:', err);
    return res.status(500).json({
      error: 'Failed to process AI debugging request.',
      message: err.message
    });
  }
}
