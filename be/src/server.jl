using Plots
using JSON
using HTTP
using Joseki
import HTTP.IOExtras.bytes

function velocityPlot()
     y = rand(10); # These are the plotting data
    return string(y)
    #return plot(x,y)
end

function plot2()
    x=rand(20)
    return string(x)
end
function simulate(req::HTTP.Request)
   return string( plot2())#("[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]")
end
#need inputs
function params(req::HTTP.Request)
    req.response.body = bytes(b)
    #get defualt senario from jasons machine
    return req.resonse
end
endpoints = [
    (simulate, "GET", "/simulate"),
    (params, "GET", "/params")
]

r = Joseki.router(endpoints)

 haskey(ENV, "PORT") ? port = parse(Int32, ENV["PORT"]) : port = 8000
println("trees")
HTTP.serve(r, "0.0.0.0", port; verbose=false)
println("here")
