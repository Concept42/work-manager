export const search = (data:any[],filter:string) => {
    const searchParameters = Object.keys(Object.assign({}, ...data))
    if(filter===""){
      return data
    }
    if(filter !=="")
    return data.filter((filtered) =>
    searchParameters.some((parameter) =>
          filtered[parameter]?.toString().toLowerCase().includes(filter)
        )
    );
  }