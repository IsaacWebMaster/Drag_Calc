from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes by default

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    power_hp = data.get('power_hp')
    weight_lb = data.get('weight_lb')
    tire_size_inches = data.get('tire_size_inches')
    nitrous_shot = data.get('nitrous_shot')
    engine_build = data.get('engine_build')

    # Adjust power based on engine build
    if engine_build == 1:
        effective_power_hp = (power_hp + nitrous_shot) * 0.95
    elif engine_build == 2:
        effective_power_hp = power_hp + nitrous_shot
    elif engine_build == 3:
        effective_power_hp = (power_hp + nitrous_shot) * 1.05
    else:
        effective_power_hp = (power_hp + nitrous_shot) * 0.95

    # Calculate quarter-mile time
    quarter_mile_time = ((weight_lb / effective_power_hp) ** 0.333) * 5.825

    return jsonify({"quarter_mile_time": round(quarter_mile_time, 2)})

if __name__ == '__main__':
    app.run(debug=True)
