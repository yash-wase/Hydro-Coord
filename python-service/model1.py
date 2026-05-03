def compute_pressure(base, distance, demand):
    alpha = 2
    beta = 5

    pressure = base - (distance * alpha) - (demand * beta)

    return max(0, min(100, pressure))
