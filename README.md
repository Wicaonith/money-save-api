# Budgetiz Api

L'API discutant avec la BDD sur MongoDB pour l'application Budgetiz.

Framework: NestJS

## Utilisation

Commande pour lancer le serveur en local (http://localhost:3000/):
```
npm run start:dev
```
http://localhost:3000/swagger => Pour le swagger


## Plugin

--> npm dotenv


## Architecture
- api/
  - domaine/
    - Controller = Liste les informations de routes à appeler et sert pour la documentation du swagger
    - Service = Fait l'appel à la BDD pour récupérer les infos voulues
    - Factory = Assemble tout les informations récupérées
    - Rules = (Facultatif) Il y a des contrôles a mettre en places

- metier/ = Accesseur à chaque collection de la BDD MongoDB
  - commun/
    - core/ = Logger / Error Management / Etc.
    - utils/ = Utilitaire (StringUtils, ArrayUtils, PasswordUtils)
  - users-metier/
  - transactions-metier/
  - customers-metier/
  - budgets-metier/ 
  - accounts-metier/
  - categories-metier/

- model/
  - dto/ = Objet DTO
    - params/ = Objet d'entrée de l'API
  - interfaces/ = Objet de sortie de l'API
  - schemas/ = Objet Document en base

- core/
  - guards/ = Guard d'authent
  - strategies/ = Strategies d'authent
  - filter/ = Filtre NestJS pour logger les exceptions
  - config/ = Classe de configuration des URLs de BDD en fonction des environnements
  - constants/ = Classes de constantes


## TODO


- Faire le CRUD de toutes les collections de façon "basiques"
- Mettre en place un bon système de log
- Gerer les erreurs et le swagger correctement (tout propre !)

Railway   
