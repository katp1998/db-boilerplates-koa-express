//koa was not used in this process
import { User } from "../models/user.model";

//@DESC: FIND IF USER EXISTS
export const findUserRepo = async (email: string) => {
  const existingUser = await User.findOneBy({ email });
  return existingUser;
};

//@desc CREATING USER
export const createUserRepo = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const existingUser = await User.findOneBy({ email });
  if (!existingUser) {
    try {
      //CREATE USER:
      const user = await User.save({
        name,
        email,
        password,
      });
      return user;
    } catch (error) {
      return error;
    }
  } else {
    return { message: "user exists" };
  }
};

//@desc FIND USER BY TOKEN
export const findUserByTokenRepo = async (RefreshToken: string) => {
  try {
    const existingUser = await User.findOneBy({ refreshToken: RefreshToken });
    return existingUser;
  } catch (error) {}
};

//@desc SAVING REFRESH TOKEN
export const saveRefreshTokenRepo = async (
  userID: string,
  RefreshToken: string
) => {
  //finding the user according to ID and update:
  await User.createQueryBuilder()
    .update(User)
    .set({ refreshToken: RefreshToken })
    .where("_id = :_id", { _id: userID })
    .execute();
};

//@desc FINDING USER BY ID
export const findUserByIdRepo = async (id: string) => {
  try {
    const existingUser = await User.createQueryBuilder("user")
      .where("_id = :_id", { _id: id })
      .select(["user.password", "user.refreshToken"]);
    console.log(existingUser);
  } catch (error) {
    return {
      error: "error",
    };
  }
};

//@desc REMOVING REFRESH TOKEN
export const removeRefreshTokenRepo = async (RefreshToken: string) => {
  try {
    const user = await findUserByTokenRepo(RefreshToken);
    if (user) {
      user.refreshToken = "";
      const result = await user.save();
      console.log(result);
    }
  } catch (error) {}
};
