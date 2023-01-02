import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, IsString, MinLength, ValidateIf } from "class-validator";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    @IsString()
    @IsNotEmpty()
    username: string;

    @Prop({ required: true, unique: true })
    @IsEmail()
    email: string;

    @Prop({ required: true })
    @IsString()
    @MinLength(8)
    password: string;

    @Prop({ default: null })
    @IsString()
    @ValidateIf((object, value) => value !== null)
    bio: string;

    @Prop({ default: null })
    @IsString()
    @ValidateIf((object, value) => value !== null)
    image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.virtual('id').get(function () {
//     return this._id;
// });

// UserSchema.set('toJSON', { virtuals: true });