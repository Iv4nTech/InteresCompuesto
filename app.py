from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    try:
        capital = float(data.get('capital', 0))
        rate_annual = float(data.get('rate', 0)) / 100
        compound_freq = int(data.get('compound_frequency', 12))
        time_value = float(data.get('time_value', 1))
        time_unit = data.get('time_unit', 'years')

        total_years = time_value if time_unit == 'years' else time_value / 12
        
        # Validación de coherencia temporal
        # Si el tiempo total es menor que un periodo de capitalización, informamos al usuario
        periods_float = total_years * compound_freq
        if periods_float < 1:
            freq_names = {1: 'un año', 2: 'seis meses', 4: 'un trimestre', 12: 'un mes', 365: 'un día'}
            return jsonify({
                'success': False, 
                'error': f'La duración seleccionada es demasiado corta. Para una frecuencia de capitalización seleccionada, el tiempo mínimo debe ser de al menos {freq_names.get(compound_freq, "un periodo")}.'
            })

        total_periods = int(round(periods_float))
        
        rate_per_period = rate_annual / compound_freq
        
        results = []
        labels = []
        
        current_capital = capital
        results.append(round(current_capital, 2))
        labels.append("Inicio")
        
        for i in range(1, total_periods + 1):
            current_capital *= (1 + rate_per_period)
            
            # Condensar puntos en el gráfico si hay demasiados (ej: al elegir interés diario en muchos años)
            if total_periods > 700:
                if compound_freq == 365 and i % 30 != 0 and i != total_periods:
                    continue
            
            if compound_freq == 1:
                labels.append(f"Año {i}")
            elif compound_freq == 12:
                if total_periods > 24:
                    y = i // 12
                    m = i % 12
                    if m == 0:
                        labels.append(f"Año {y}")
                    else:
                        labels.append(f"Año {y} Mes {m}")
                else:
                    labels.append(f"Mes {i}")
            elif compound_freq == 365:
                if total_periods > 700:
                    m = i // 30
                    labels.append(f"Mes {m}")
                else:
                    labels.append(f"Día {i}")
            elif compound_freq == 4:
                labels.append(f"Trimestre {i}")
            elif compound_freq == 2:
                labels.append(f"Semestre {i}")
            else:
                labels.append(f"Período {i}")
                
            results.append(round(current_capital, 2))
                
        return jsonify({
            'success': True,
            'labels': labels,
            'data': results,
            'total': round(current_capital, 2)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
