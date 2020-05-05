app.get('/user/:age', async(req,res) => {
    const age = req.params.age
    try  { 
        const age = await age.find(age)

        if (!age) {
            return res.status(404).send()
        }

        res.send(age)
    
    }catch (e) {
         res.status(500).send()

    }
})