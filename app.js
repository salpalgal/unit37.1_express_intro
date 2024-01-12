const express = require("express")
const app = express()
const ExpressError = require("./expressError")

app.get('/mean', function findMean(req,res,next){
    try{
        const {num} = req.query;
        if(!num){throw new ExpressError("numbers required", 400)}
        let numArr = num.split(",")
        let sum = 0
        for(let num of numArr){
            let int = parseInt(num)
            if(Number.isInteger(int)==false){throw new ExpressError(`${num} is not a number`, 400)}
            sum += int
        }
        let mean = sum/numArr.length
        let meanObj = {operation:"mean",value:mean}
         
        return res.json({response:meanObj}) 
    }catch(err){
        return next(err)
    }
    
})

app.get('/median', function findMedian(req,res,next){
    try{
        const {num} = req.query;
        if(!num){throw new ExpressError("numbers required", 400)}
        let numArr = num.split(",")
        let sum = 0
        for(let num of numArr){
            let int = parseInt(num)
            if(Number.isInteger(int)==false){throw new ExpressError(`${num} is not a number`, 400)}
            sum += int
        }
        let median = sum/2
        let medianObj = {operation:"median",value:median}
        return res.json({response:medianObj})
    }catch(err){
        return next(err)
    }
    
})

app.get('/mode', function findMode(req,res,next) {
    try{
        const {num} = req.query;
        if(!num){throw new ExpressError("numbers required", 400)}
        let numArr = num.split(",")
        let obj = {}
        
        for(let num of numArr){
            if(Number.isInteger(parseInt(num))==false){throw new ExpressError(`${num} is not a number`, 400)}
            if(num in obj){
                let int = parseInt(obj[num])
                int += 1 
                obj[num] = int
            }else{
                obj[num] = "1"
            }    
        }
        const values = Object.values(obj)
        let valuesArr=[]
        for(let v of values){
            let int = parseInt(v)
            valuesArr.push(int)
        }
        const largest = Math.max(...valuesArr)
        const largeStr = largest.toString()
        for(let key in obj){
            if(obj[key]==largeStr){
                let modeObj = {operation:"mode",value:key}
                return res.json({response:modeObj})
            }
        }
    }catch(err){
        return next(err)
    }
    

})

app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
  });
  
  // generic error handler
app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
  });

app.listen(3000,function(){
    console.log('app on port 3000')
})
