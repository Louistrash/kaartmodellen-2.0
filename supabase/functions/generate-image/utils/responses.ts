// CORS headers for all responses
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Response helper functions
export function createSuccessResponse(data: any) {
  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

export function createErrorResponse(error: string, details?: any, status = 500) {
  console.error('Image generation error:', error);
  return new Response(
    JSON.stringify({ error, ...(details && { details }) }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status }
  );
}
