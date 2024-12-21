type VarsType = {
    [key:string]: string|number
}
const templateImplement = (stringTemplate:string, vars: VarsType) => {
 
    for(const key in vars){ 
        if(stringTemplate.includes(`{{${key}}}`)){  
            stringTemplate = stringTemplate.replaceAll(`{{${key}}}`,String(vars[key])) 
        } 
    }
    return stringTemplate  
}
export default templateImplement