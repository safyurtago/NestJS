import { User } from "../../models/user.model";

export const userStub = (): Partial<User> => {
    return {
        id: 1,
        name: "John",
        email: "john@example.com",
        password: "password",
        is_active: true
    };
};