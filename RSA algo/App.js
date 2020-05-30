const rsa=require('node-rsa')
const fs=require('fs')

var publickey=new rsa()
var privatekey=new rsa()
var public=fs.readFileSync("./keys/public.pem","utf8")
var private=fs.readFileSync("./keys/private.pem","utf8")
publickey.importKey(public)
privatekey.importKey(private)
function CreateLicense(mall)
{
	const saltFirst="hlcsghnnvcsfhjkiuyggdwwrfv"
	const saltSecond="vcxmnbsolppsofcsfhjkiuyggdwwrfv"

	const encrypt=privatekey.encryptPrivate(saltFirst+mall+saltSecond,"base64")
	return encrypt
}
function checkvalidity(license)
{
	const decrypted=publickey.decryptPublic(license,"utf8")
	if("hlcsghnnvcsfhjkiuyggdwwrfva@exmaple.comvcxmnbsolppsofcsfhjkiuyggdwwrfv"==decrypted)
	return true
	else
		return false
}
//This was our licene for one time
//Tp0LbcT+6SuXz+Tb50qq+PZhB1iNyaFnjAEQy3CgfR/32fTIGQf/h5s4deDceiC6xlIH/Z5pdZiWe3/ye1F1VVeFjqaRd7oRy8iiZabN/7ktIon4dgtcabLIkGWP7HrC6MRB/z6AC+ncXJSIkODogst0H+nkFnIFhWRO0HY8CeKQcfLlZlHfVBdEm4bh1DlOwRySP9TkiejMx9/hdOKtKPrh0S65GHbKyRJAS0SS8J6Itf20WM5NU8cFjSfWcK9AM3TX0wSNP9vL2UkufNytn89yAIZq76p4ipfiJkz3VcJuF1C0j/Sw03z01E0+I32/Mz0bj9EQ0wEF2lbhOz0kwg==

console.log("license"+CreateLicense("a@exmaple.com"))
console.log(checkvalidity(CreateLicense("a@exmaple.com")))