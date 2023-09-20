import { User } from './user';
import { UserService } from './user.service';
import fs from 'fs';

export class UserJSONService implements UserService {
    add(username: string): User {
        // Chargez les données JSON actuelles depuis le fichier
        const jsonData = fs.readFileSync(`${__dirname}/users.json`, 'utf-8');

        // Analysez les données JSON en un tableau d'utilisateurs
        const users: User[] = JSON.parse(jsonData);

        if(users.some(user => user.username === username)) {
            throw new Error(`L'utilisateur ${username} existe déjà !`);
        }

        // Créez un nouvel utilisateur
        const newUser: User = new User(users.length > 0 ? users[users.length - 1].id + 1 : 0, username);

        // Ajoutez le nouvel utilisateur au tableau
        users.push(newUser);

        // Convertissez le tableau mis à jour en JSON
        const updatedData = JSON.stringify(users, null, 2);

        // Écrivez les données JSON mises à jour dans le fichier
        fs.writeFileSync(`${__dirname}/users.json`, updatedData);

        console.log(`Utilisateur "${username}" ajouté avec succès.`);

        return newUser;
    }

    getById(id: number): User | null {
        // Chargez les données JSON actuelles depuis le fichier
        const jsonData = fs.readFileSync(`${__dirname}/users.json`, 'utf-8');

        // Analysez les données JSON en un tableau d'utilisateurs
        const users: User[] = JSON.parse(jsonData);

        return users.find(user => user.id === id) || null;
    }
}
