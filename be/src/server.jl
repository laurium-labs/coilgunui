using Plots
using Json
using HTTP


function velocityPLot()
    x = 1:10; y = rand(10); # These are the plotting data
    return plot(x, y)
end

