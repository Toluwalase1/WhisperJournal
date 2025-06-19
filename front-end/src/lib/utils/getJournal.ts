export const getJournals = async() => {
        const response = await fetch('http://localhost:3000/user/journals', {
            method: 'GET',
            headers: {
                'content-Type': 'application/json'
            }
        })
        const journals = await response.json()

            if(response.ok){
                console.log(journals)
            }
        
    }