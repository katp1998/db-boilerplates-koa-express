import userModel from "../models/user.model";
import { IUser, IUserInputs } from "../types/user.type";

export const createUserRepo = async ({ username, email }: IUserInputs) => {
  try {
    const user = new userModel({
      username,
      email,
    });

    const userResult = await user.save();

    return userResult;
  } catch (error) {
    return error;
  }
};

export const findUserRepo = async (email: any) => {
  try {
    const existingUser = await userModel.findOne({ email: email });
    return existingUser;
  } catch (error) {}
};

export const findUserByTokenRepo = async (refreshToken: any) => {
  try {
    const existingUser = await userModel.findOne({
      refreshToken: refreshToken,
    });
    return existingUser;
  } catch (error) {}
};

export const saveRefreshTokenRepo = async (
  userID: string,
  refreshToken: string
) => {
  const user = await userModel
    .findById(userID)
    .findOneAndUpdate({ refreshToken: refreshToken });

  const result = await user?.save();
  //  console.log(result)
};

export const findUserByIdRepo = async (id: string) => {
  try {
    const existingUser = await userModel
      .findById(id)
      .select("-password")
      .select("-refreshToken");
    console.log({ existingUser });

    return existingUser;
  } catch (error) {
    return {
      error: "error",
    };
  }
};

export const removeRefreshTokenRepo = async (refreshToken: string) => {
  try {
    const user = await findUserByTokenRepo(refreshToken);
    if (user) {
      user.refreshToken = "";
      const result = await user.save();
      console.log(result);
    }
  } catch (error) {}
};
