import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

module.exports = (sequelize, DataTypes) => { 
    class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
        declare id: CreationOptional<number>;
        password: string;
        firstName: string;
        lastName: string;
        patronimicName: string;
        phone: string;
        email: string;
        // userType: string;

//         Evgeniy Shelaykin, [6 марта 2025 г., 18:04:54]:
        // companyName: string;
// ИНН - inn  
// КПП - kpp  
// Банк - bank  
// Город банка - bankCity  
// БИК - bik  
// Счет - account  
// Корр. счет - corrAccount  
// ОГРН - ogrn  
// ОКПО - okpo  

// Юридический адрес - legalAddress  

// Индекс - postalCode  
// Страна - country  
// Регион - region  
// Город - city  
// Улица - street  
// Номер дома - houseNumber  
// Корпус - building  
// Квартира / Офис - apartment


// companyData


// userType


// false-user userType
// true-company userType


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
