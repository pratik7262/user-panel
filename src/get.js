const getDetails= async (id) => {
    const responce = await fetch(
      `http://localhst:5000/api/property/propertyinfo/${id}`
    );

    const json = await responce.json();
    console.log(json);
  };