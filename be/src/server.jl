using Plots
using JSON
using HTTP
using Joseki
import HTTP.IOExtras.bytes

function velocityPlot()
    x = 1:10; y = rand(10); # These are the plotting data
    return plot(x, y)
end

function simulate(req::HTTP.Request)
    if !validate(req)
        return HTTP.Response(401)
    end
    return velocityPlot()
end
function params(req::HTTP.Request)
    b = get_default_scenario_json()
    req.response.body = bytes(b)
    return req.response
end
endpoints = [
    (simulate, "GET", "/simulate"),
    (params, "GET", "/params")
]
 r = Joseki.router(endpoints)

 haskey(ENV, "PORT") ? port = parse(Int32, ENV["PORT"]) : port = 8000

HTTP.serve(r, "0.0.0.0", port; verbose=false)

