const puppeteer =  require('puppeteer')


// Función auto-ejecutable: ( async () => { } ) ()

const run = async ()=>
{
    // El navegaor por defecto

    const browser = await puppeteer.launch() // Lanzar navegador
    const page = await browser.newPage() // Abrir una pagina nueva


    // TOMAR UN SCREENSHOT
    // await page.goto('https://platzi.com/cursos/html5-css3/opiniones/1/');
    
    // await page.screenshot({
        //     path: 'screenshot.png',
        //     fullPage: true
        // })
    
    async function getPageData() {
        
        // Ir a una pagina
        await page.goto('https://platzi.com/cursos/html5-css3/opiniones/1/')

        const data = await page.evaluate(()=>{
            
            // Obtener la clase .Review
            const $reviews = document.querySelectorAll('.Review')
            const data = []

            $reviews.forEach(($reviews)=>{

                let description = $reviews
                                  .querySelector('.Review-description') // Obetener Review Descr
                                  .textContent // Obtener Texto
                                  .trim() // Limpiar espacios

                let name = $reviews
                           .querySelector('.Review-info .Review-name strong')
                           .textContent
                           .trim()
              
                let starts = $reviews
                             .querySelector('.Review-info .Review-stars')
                             .querySelectorAll('.fulled') // Get starts
                             .length // Cantidad de Starts de veces que hay 
                

                data.push({
                    content: description,
                    name:  name,
                    starts : starts
                })
            })
            return {
                reviews: data,
            }
        })
    
        console.log("DATA,", data);
        
    }

    getPageData()

    // await browser.close()
    
}

run()