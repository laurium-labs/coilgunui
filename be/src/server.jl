using Plots
using JSON
using HTTP
using Joseki
using JuliaWebAPI

# Define functions testfn1 and testfn2 that we shall expose
function testfn1(arg1, arg2; narg1="1", narg2="2")
    return (parse(Int, arg1) * parse(Int, narg1)) + (parse(Int, arg2) * parse(Int, narg2))
end

testfn2(arg1, arg2; narg1="1", narg2="2") = testfn1(arg1, arg2; narg1=narg1, narg2=narg2)

# Expose testfn1 and testfn2 via a ZMQ listener
process(
    JuliaWebAPI.create_responder([
        (testfn1, true),
        (testfn2, false)
    ], "tcp://127.0.0.1:9999", true, "")
)

function velocityPlot()
    x = 1:10; y = rand(10); # These are the plotting data
    return x,y
end

function auth_preproc(req::HTTP.Request)
    if !validate(req)
        return HTTP.Response(401)
    end
    return velocityPlot()
end
run_http(apiclnt, 8888, auth_preproc)
# r = Joseki.router(endpoints)
velocityPlot()

<<<<<<< Updated upstream

# haskey(ENV, "PORT") ? port = parse(Int32, ENV["PORT"]) : port = 8000

# HTTP.serve(r, "0.0.0.0", port; verbose=false)
=======
 haskey(ENV, "PORT") ? port = parse(Int32, ENV["PORT"]) : port = 8000
println("trees")
HTTP.serve(r, "0.0.0.0", port; verbose=false)#Belive this creates n active API, shuts down when program does
println("here")
>>>>>>> Stashed changes
