import  { Connection } from '../connection/connection.js';


class UserRepository extends IEntityRepository {

    constructor (connection) {
        this.pool = new Connection().createPool();
    }

}