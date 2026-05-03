def adjust_pressure(pressure, complaints, rainfall=False):
    alert = None

    if pressure < 30 and complaints > 2:
        pressure -= 20
        alert = "PIPE_BURST"

    if rainfall:
        pressure -= 10

    return max(0, pressure), alert
