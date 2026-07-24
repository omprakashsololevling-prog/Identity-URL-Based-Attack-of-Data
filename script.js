document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const urlInput = document.getElementById('urlInput');
    const resultContainer = document.getElementById('resultContainer');
    const resultText = document.getElementById('resultText');

    analyzeBtn.addEventListener('click', () => {
        const query = urlInput.value.trim();

        if (!query) {
            alert('Please enter a URL or data string to analyze.');
            return;
        }

        // Basic detection logic (Can be customized according to your research model)
        const suspiciousPatterns = ['<script>', 'select *', 'union', 'exec', '%20', 'eval('];
        let detected = false;

        suspiciousPatterns.forEach(pattern => {
            if (query.toLowerCase().includes(pattern)) {
                detected = true;
            }
        });

        resultContainer.classList.remove('hidden');

        if (detected) {
            resultContainer.style.borderColor = '#f85149';
            resultText.style.color = '#f85149';
            resultText.innerHTML = `⚠️ <strong>Warning:</strong> Potential URL/Data-based security threat pattern detected!`;
        } else {
            resultContainer.style.borderColor = '#3fb950';
            resultText.style.color = '#3fb950';
            resultText.innerHTML = `✅ <strong>Clear:</strong> No basic anomaly signatures detected in the provided input.`;
        }
    });
});