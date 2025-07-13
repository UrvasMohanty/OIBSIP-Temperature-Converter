document.addEventListener('DOMContentLoaded', function() {
            const convertBtn = document.getElementById('convert-btn');
            const temperatureInput = document.getElementById('temperature');
            const fromUnitSelect = document.getElementById('from-unit');
            const toUnitSelect = document.getElementById('to-unit');
            const resultDiv = document.getElementById('result');
            
            convertBtn.addEventListener('click', convertTemperature);
            
            // Also convert when Enter key is pressed in the input field
            temperatureInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    convertTemperature();
                }
            });
            
            function convertTemperature() {
                const temperature = parseFloat(temperatureInput.value);
                
                if (isNaN(temperature)) {
                    resultDiv.textContent = 'Please enter a valid number';
                    resultDiv.style.color = '#e74c3c';
                    return;
                }
                
                const fromUnit = fromUnitSelect.value;
                const toUnit = toUnitSelect.value;
                
                let convertedTemp;
                
                // Convert to Celsius first if needed
                let celsius;
                switch(fromUnit) {
                    case 'celsius':
                        celsius = temperature;
                        break;
                    case 'fahrenheit':
                        celsius = (temperature - 32) * 5/9;
                        break;
                    case 'kelvin':
                        celsius = temperature - 273.15;
                        break;
                }
                
                // Convert from Celsius to target unit
                switch(toUnit) {
                    case 'celsius':
                        convertedTemp = celsius;
                        break;
                    case 'fahrenheit':
                        convertedTemp = (celsius * 9/5) + 32;
                        break;
                    case 'kelvin':
                        convertedTemp = celsius + 273.15;
                        break;
                }
                
                // Round to 2 decimal places
                convertedTemp = Math.round(convertedTemp * 100) / 100;
                
                // Get unit symbols
                const unitSymbols = {
                    'celsius': '°C',
                    'fahrenheit': '°F',
                    'kelvin': 'K'
                };
                
                resultDiv.innerHTML = `
                    ${temperature} ${unitSymbols[fromUnit]} = 
                    <strong>${convertedTemp} ${unitSymbols[toUnit]}</strong>
                `;
                resultDiv.style.color = '#2c3e50';
            }
        });