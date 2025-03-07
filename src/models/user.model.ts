import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
// import { Json } from 'sequelize/types/utils';

module.exports = (sequelize, DataTypes) => { 
    class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
        declare id: CreationOptional<number>;
        password: string;
        firstName: string;
        lastName: string;
        patronimicName: string;
        phone: string;
        email: string;
        userType: string;
        declare companyData: CreationOptional<object>;
        // companyData: object;
            // companyName: string;
            // inn  
            // kpp  
            // bank  
            // bankCity  
            // bik  
            // account  
            // corrAccount  
            // ogrn  
            // okpo  
        declare legalAddress: CreationOptional<object>;
        // legalAddress: object;  
            // postalCode  
            // country  
            // region  
            // city  
            // street  
            // houseNumber  
            // building  
            // apartment

        createdAt: Date;
        updatedAt: Date;
    
        /**
         * Check if password matches the user's password
         * @param {string} password
         * @returns {Promise<boolean>}
         */
        async isPasswordMatch(password) {
            return bcrypt.compare(password, this.password);
        };  
    }
    
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(value: string) {
                    const salt = bcrypt.genSaltSync();
                    this.setDataValue('password', bcrypt.hashSync(value, salt));
                }
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            patronimicName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userType: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            companyData: {
                type: DataTypes.JSON,
                allowNull: true
            },
            legalAddress: {
                type: DataTypes.JSON,
                allowNull: true
            },
            // technically, `createdAt` & `updatedAt` are added by Sequelize and don't need to be configured in Model.init
            // but the typings of Model.init do not know this. Add the following to mute the typing error:
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        { 
            sequelize,
            timestamps: true,
            modelName: 'User',
            tableName: 'users',
            underscored: true,
            paranoid: true , 
            freezeTableName: true
        },
    );
    
    
    return User;
}
