const module = (input) => new Promise((resolve) => {
    if (!input.length) return '0';
    if (input.length % 2 === 1) input.push(input[input.length - 1]);
    while(input.length > 1) {
        // TODO доработать (тут полный будет)
        let arrLevelHashes = [];
        // TODO доработать
        if (input.length % 2 === 1) input.push(input[input.length - 1]);

        for(let i = 0; i < arrLevelHashes.length / 2; i++) {
            let hash_1 = await doOneWork(input[i * 2]);
            let hash_2 = await doOneWork(input[i * 2 + 1]);
            arrLevelHashes.push(hash_1 + hash_2);                        
        }    
    }
    let finalHash = await doOneWork(arrLevelHashes[0]);
    resolve(finalHash);
});

const doOneWork = async (text) => {
    return new Promise(async resolve => {
        try {
            await sleep()
            const worker = new Worker("./worker");
            worker.onMessage = ((data) => {                                                    
                worker.delete();
                resolve(data);
            });
            worker.postMessage(text);
        } catch(e) {
           return doOneWork(text);
        }
    });                        
};
async function sleep() 
{
    return new Promise(resolver => {  
        setTimeout(() => { resolver(true); }, 10);
    })
};


const Worker = require("./WorkerClass");
const doOneWork = (text) => {
	return new Promise((resolve, reject) => {
		let inte = setInterval(()=>{
			try {
				const worker = new Worker("./worker");
				worker.onMessage = (data) => {
					clearInterval(inte)
					worker.delete();
					resolve(data)
				};

				worker.postMessage(text);
			} catch (e) {
			}
		},150)

	})
};

function main(input, resolve) {
	if (input.length === 0) {
		resolve([])
		return;
	}
	let buff = JSON.parse(JSON.stringify(input))
	let promises = []
	let result = []
	for (let i = 0; i < buff.length; i++) {
		promises.push(doOneWork(buff[i]))
	}
	Promise.allSettled(promises)
		.then(async (e) => {
			let newPromises = []

			for (let i in e) {
				if (e[i].status === "fulfilled") {
					result.push(e[i].value)
				} else {
					newPromises.push(buff[i])
				}
			}
			let fixes = await new Promise((res) => main(newPromises, res))
			resolve(result.concat(fixes))
		})
}

async function veryMainFunc(input, resolve) {
	if(input.length===0){
		resolve("0")
		return "0"
	}
	while (input.length > 1) {
		let buff = await new Promise((res, reject) => main(input, res))

		if (buff.length % 2 !== 0) {
			buff.push(buff[buff.length - 1])
		}
		let buffObj = []
		for (let i = 0; i < buff.length / 2; i++) buffObj.push("")
		for (let i = 0; i < buff.length; i++) {
			if (i % 2 !== 0) {
				buffObj[Math.ceil(i / 2) - 1] = buffObj[Math.ceil(i / 2) - 1] + buff[i]
			} else {
				buffObj[i / 2] = buffObj[i / 2] + buff[i]
			}
		}
		input = buffObj
	}
	let hash = await doOneWork(obj[0])
	resolve(hash)
}

module.exports = (input) => new Promise((resolve) => {
	veryMainFunc(input, resolve)
})