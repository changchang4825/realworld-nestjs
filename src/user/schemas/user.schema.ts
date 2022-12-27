import { Schema, Prop } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    bio: string;

    @Prop()
    image: string;
}
