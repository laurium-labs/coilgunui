using Plots
using JSON
using HTTP
using Joseki
import HTTP.IOExtras.bytes

function velocityPlot()
    x = 1:10; y = rand(10); # These are the plotting data
    return x,y
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


run_http(apiclnt, 8888, auth_preproc)
endpoints = [
    (simulate, "GET", "/simulate"),
    (params, "GET", "/params")
]

r = Joseki.router(endpoints)
velocityPlot()

 haskey(ENV, "PORT") ? port = parse(Int32, ENV["PORT"]) : port = 8000
println("trees")
HTTP.serve(r, "0.0.0.0", port; verbose=false)#Belive this creates n active API, shuts down when program does
println("here")
