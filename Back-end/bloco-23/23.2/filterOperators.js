// Selecione e faça a contagem dos restaurantes presentes nos bairros Queens , Staten Island e Bronx . (utilizando o atributo borough )

db.restaurants.find({'borough': {$in: ['Queens', 'Staten Island', 'Bronx']}}).count()

// Selecione e faça a contagem dos restaurantes que não possuem culinária do tipo American . (utilizando o atributo cuisine )

db.restaurants.find({'cuisine': { $ne: 'American'}}).count()

// Selecione e faça a contagem dos restaurantes que possuem avaliação maior ou igual a 8 . (utilizando o atributo rating )

db.restaurants.find({'rating': { $gte: 8}}).count()

// Selecione e faça a contagem dos restaurantes que possuem avaliação menor que 4 .

db.restaurants.find({'rating': { $lt: 4}}).count()

// Selecione e faça a contagem dos restaurantes que não possuem as avaliações 5 , 6 e 7 .

db.restaurants.find({'rating': {$nin: [5, 6, 7]}}).count()