import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { endpoint } = await req.json();
    
    if (!endpoint) {
      throw new Error('Endpoint is required');
    }

    const n8nBaseUrl = Deno.env.get('N8N_BASE_URL');
    const n8nApiKey = Deno.env.get('N8N_API_KEY');

    if (!n8nBaseUrl || !n8nApiKey) {
      throw new Error('N8N configuration is missing');
    }

    console.log(`Proxying request to: ${n8nBaseUrl}${endpoint}`);

    const response = await fetch(`${n8nBaseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'X-N8N-API-KEY': n8nApiKey,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`n8n API error: ${response.status} - ${errorText}`);
      throw new Error(`n8n API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in n8n-proxy:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: 'Check edge function logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
