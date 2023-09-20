import fs from 'fs';
import { UserJSONService } from './user.json-service';
import { User } from './user';

jest.mock('fs');
const fsMock = fs as jest.Mocked<typeof fs>;

describe('UserJSONService', () => {
    let sut: UserJSONService;

    beforeEach(() => {
        sut = new UserJSONService();
        jest.resetAllMocks();
    });

    describe('getById', () => {

        beforeEach(() => {
            jest.resetAllMocks();
        })

        it('should return a user when a valid id is provided', () => {
            // Données JSON simulées
            const mockUserData = [
                { id: 1, username: 'user1' },
                { id: 2, username: 'user2' },
                { id: 3, username: 'user3' },
            ];
    
            // Configuration du mock de lecture de fichier pour renvoyer les données simulées
            const readFileMock = jest.spyOn(fs, 'readFileSync');
            readFileMock.mockReturnValue(JSON.stringify(mockUserData));
    
            // Appel de la fonction getById avec un id valide
            const user = sut.getById(2);
    
            // Vérifiez que la fonction renvoie le bon utilisateur
            expect(user).toEqual({ id: 2, username: 'user2' });
        });
    
        it('should return null when an invalid id is provided', () => {
            // Données JSON simulées
            const mockUserData = [
                { id: 1, username: 'user1' },
                { id: 2, username: 'user2' },
                { id: 3, username: 'user3' },
            ];
    
            // Configuration du mock de lecture de fichier pour renvoyer les données simulées
            const readFileMock = jest.spyOn(fs, 'readFileSync');
            readFileMock.mockReturnValue(JSON.stringify(mockUserData));
    
            // Appel de la fonction getById avec un id invalide
            const user = sut.getById(4);
    
            // Vérifiez que la fonction renvoie null
            expect(user).toBeNull();
        });
    
    })
})