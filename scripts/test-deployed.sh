#!/bin/bash
set -e

SERVICE_URL="https://bszawtavwc.us-east-1.awsapprunner.com"

echo "🧪 Testing MCP Carbon Calculator deployment..."
echo "📡 Service URL: $SERVICE_URL"
echo ""

test_tool() {
    local tool_name="$1"
    local args="$2"
    
    echo "Testing $tool_name..."
    
    payload=$(cat <<EOF
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "$tool_name",
    "arguments": $args
  }
}
EOF
)
    
    response=$(curl -s -X POST "$SERVICE_URL" \
        -H "Content-Type: application/json" \
        -d "$payload" \
        --max-time 10)
    
    echo "📄 Response: $response"
    
    if echo "$response" | grep -q '"result"'; then
        echo "✅ $tool_name: PASSED"
        return 0
    else
        echo "❌ $tool_name: FAILED"
        return 1
    fi
}

# Test all 3 tools
passed=0
total=3

echo "=== Testing Electricity Emission ==="
if test_tool "electricity_emission" '{"killo_watt_hours": 100, "state": "Victoria"}'; then
    ((passed++))
fi
echo ""

echo "=== Testing Gas Emission (Metro) ==="
if test_tool "gas_emission_metro" '{"giga_joules": 15, "gas_type": "New South Wales & ACT"}'; then
    ((passed++))
fi
echo ""

echo "=== Testing Gas Emission (Non-Metro) ==="
if test_tool "gas_emission_non_metro" '{"giga_joules": 10, "gas_type": "Queensland"}'; then
    ((passed++))
fi
echo ""

echo "📊 Results: $passed/$total tests passed"

if [ $passed -eq $total ]; then
    echo "🎉 All tests passed! MCP service is working correctly."
    exit 0
else
    echo "⚠️  Some tests failed. Check service deployment."
    exit 1
fi