function showProduct() {
    axios.get('https://crudcrud.com/api/a3d0de8c067a48d8a357af3e7acabbe3/PoductAdmin')
        .then((response) => {
            let html_Food = ''
            let html_skinCare = ''
            let html_Elec = ''
            response.data.forEach(element => {
                if (element.Cateagory === "Food") {
                    html_Food += '<tr>'
                    html_Food += `<td>${element.Price}</td>`
                    html_Food += `<td>${element.ProductName}</td>`
                    html_Food += `<td>${element.Cateagory}</td>`
                    html_Food += `<td>
                                      <button class="btn btn-danger" onclick=DeleteProduct('${element._id}') > X </button>
                                      <button class="btn btn-warning" onclick=EditProduct('${element._id}')> ! </button>                                                                            
                                  </td>`
                    html_Food += '</tr>'
                }
                if (element.Cateagory === "Skin Care") {
                    html_skinCare += '<tr>'
                    html_skinCare += `<td>${element.Price}</td>`
                    html_skinCare += `<td>${element.ProductName}</td>`
                    html_skinCare += `<td>${element.Cateagory}</td>`
                    html_skinCare += `<td>
                                           <button class="btn btn-danger" onclick=DeleteProduct('${element._id}')>X</button>
                                           <button class="btn btn-warning" onclick=EditProduct('${element._id}')> ! </button>                                                                            
                                       </td>`
                    html_skinCare += '</tr>'
                }

                if (element.Cateagory === "Electronics") {
                    html_Elec += '<tr>'
                    html_Elec += `<td>${element.Price}</td>`
                    html_Elec += `<td>${element.ProductName}</td>`
                    html_Elec += `<td>${element.Cateagory}</td>`
                    html_Elec += `<td>
                                  <button class="btn btn-danger" onclick=DeleteProduct('${element._id}') > X </button>
                                  <button class="btn btn-warning" onclick=EditProduct('${element._id}')> ! </button>                                                                            
                                 </td>`
                    html_Elec += '</tr>'
                }
            });
            document.querySelector('#FoodTable tbody').innerHTML = html_Food
            document.querySelector('#ElectronicsTable tbody').innerHTML = html_Elec
            document.querySelector('#SkinCareTable tbody').innerHTML = html_skinCare

        })
        .catch(err => console.log(err))
}
document.onload = showProduct()

function AddProduct() {
    document.getElementById('AddBtn').addEventListener('click', () => {
        let Price = document.getElementById('Price').value
        let ProductName = document.getElementById('ProductName').value
        let Cateagory = document.getElementById('Category').value
        console.log(Price, ProductName, Cateagory)

        let Product = {
            Price,
            ProductName,
            Cateagory,
        }
        axios.post('https://crudcrud.com/api/a3d0de8c067a48d8a357af3e7acabbe3/PoductAdmin', Product)
            .then((response) => {
                showProduct()
                console.log('product added')
            })
            .catch(err => console.log(err))
    })
}
AddProduct()


function DeleteProduct(id) {
    axios.delete(`https://crudcrud.com/api/a3d0de8c067a48d8a357af3e7acabbe3/PoductAdmin/${id}`)
        .then(() => {
            showProduct()
            console.log('deleted')
        })
        .catch(err => console.log(err))
}

function EditProduct(id){
    document.getElementById('UpdateBtn').style.display='block'
    document.getElementById('AddBtn').style.display='none'

    axios.get(`https://crudcrud.com/api/a3d0de8c067a48d8a357af3e7acabbe3/PoductAdmin/${id}`)
    .then((response)=>{
        document.getElementById('Price').value=response.data.Price
        document.getElementById('ProductName').value=response.data.ProductName
        document.getElementById('Category').value=response.data.Cateagory
        
        document.getElementById('UpdateBtn').onclick=()=>{
            axios.put(`https://crudcrud.com/api/a3d0de8c067a48d8a357af3e7acabbe3/PoductAdmin/${id}`,{
                Price:document.getElementById('Price').value,
                ProductName:document.getElementById('ProductName').value,
                Cateagory:document.getElementById('Category').value,
            }
            ).then(()=>{
                document.getElementById('UpdateBtn').style.display='none'
                document.getElementById('AddBtn').style.display='block'
                showProduct()
            })

        }

    })
    .catch(err=>console.log(err))


}