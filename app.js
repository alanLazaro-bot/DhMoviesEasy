const http = require('http');
const fs = require('fs');

const movies = require ('./movies');

const faqs = require ('./faqs');

const theaters = require ('./theaters');


// Servidor
http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	
	// Route System
	switch (req.url) {
		// Home
		case '/':
			

			let peliculas = movies.sort(function (a,b){

			if (a.title > b.title) return 1
			if (a.title < b.title) return -1

			return 0;

			});
			let listado = ``;

			for (var i=0; i<movies.length; i++){

				listado += `</br>${peliculas[i].title}`
			}
		
			let contenido = `Bienvenidos a DH Movies el mejor sitio para encontrar las mejores peliculas, incluso mucho mejor que Netflix, Cuevana y Popcorn.

			
Total de peliculas ${movies.length}
</br>
</br>

Listado de Peliculas:</br> ${listado}
</br>
</br>
</br>
</br>


Recordá que podés visitar las secciones:</br>
</br>
i. En Cartelera</br>
ii. Más Votadas</br>
iii. Sucursales</br>
iv. Contacto</br>
v. Preguntas Frecuentes</br>
`

			res.end(contenido)
			
			 
			break;
		// En cartelera
		case '/en-cartelera':
		
			let cartePelis = movies.sort(function (a,b){

				if (a.title > b.title) return 1
				if (a.title < b.title) return -1
	
				return 0;
	
				});
				let pelis = ``;
	
				for (var i=0; i<movies.length; i++){
	
					pelis += `</br>${cartePelis[i].title}
					</br>
					</br>
					${cartePelis[i].overview}</br>`
				}

		let cartelera =
		`En cartelera
		</br>
		</br>
		Total de peliculas: ${movies.length}</br>
		</br>
		${pelis}`





			res.end(cartelera);
			break;

		case '/mas-votadas':

		let masVot= ``; 
		let sumaRating = 0;
		let movieTot = 0;

		for(var j=0; j>movies.length; j++){

			if (movies[j].vote_average >7){
			movieTot ++;
			masVot += `Titulo: ${movies[j].title}
			Rating: ${movies[j].vote_average}
			Sinopsis: ${movies[j].overview}`;
			sumaRating += movies[j].vote_average; 
			}
		}
		let promedio = sumaRating/movieTot;
	
			
			let	votadas= `Más votadas</br>
			</br>
			Total de peliculas:${movieTot}</br>
			</br>
			Rating Promedio:${promedio}</br>
			</br>
			Lista de películas </br>
			</br>
			${masVot}`


			res.end(votadas);
			break;
		case '/sucursales':
			var totalSalas= 0;

			for (var l=0;l<theaters.length; l++){

				totalSalas += theaters[l].total_rooms;
			}
			let infoSalas = ``;
			for (var i=0; i<theaters.length; i++){

				infoSalas += `</br>${theaters[i].name}
				</br>
				</br>${theaters[i].address}</br>
				</br>${theaters[i].description}</br>
			
				`
				
				}
		
		let sucursales =`Nuestras Salas
		</br>
		</br>
		Total de salas: ${totalSalas}
		</br>
		</br>
		Listado de Salas</br>
		</br>
		${infoSalas}
		`

			res.end(sucursales);
			break;
		case '/contacto':

			let contacto = ` Contáctanos</br></br>
			
			
			
			¿Tenés algo para contarnos? Nos encanta escuchar a nuestros
			clientes. Si deseas contactarnos podés escribirnos al siguiente email:
			dhmovies@digitalhouse.com o en las redes sociales. Envianos tu consulta,
			sugerencia o reclamo y será respondido a la brevedad posible. Recordá que
			también podes consultar la sección de Preguntas Frecuentes para obtener
			respuestas inmediatas a los problemas más comunes. `

			res.end(contacto);

			break;
		case '/preguntas-frecuentes':

		let pregfreq = ``;
			for (var i=0; i<faqs.length; i++){

				pregfreq += `</br>${faqs[i].faq_title}
				</br>
				</br>${faqs[i].faq_answer}</br>`
				
				}

		let preguntas = ` Preguntas Frecuentes</br></br>
Total de Preguntas: ${faqs.length}
</br></br>
		${pregfreq};
		
		
		`
			res.end(preguntas);
			break;
		default:
			res.end('404 not found')
	}
}).listen(3030, 'localhost', () => console.log('Server running in 3030 port'));