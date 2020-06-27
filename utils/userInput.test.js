import "dotenv/config.js";
import { createNewCategory } from "./categoryController";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import Question from "../models/Category";

import { mockResponse, mockRequest } from "../test_helpers/mock-req-res.js";

import fs from "fs";
const fsp = fs.promises;



describe("getUserOptions", () => {


  it("prompt the user for options", async () => {
    const category = JSON.parse(JSON.stringify(testCategory));
    delete category.title;

    const requestOptions = {
      body: { category },
    };

    const req = mockRequest(requestOptions);
    const res = mockResponse();
    await createNewCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    const responseBody =
      "Category validation failed: title: Please supply a title";
    expect(res.send).toHaveBeenCalledWith(responseBody);
  });

  describe("saving question", () => {
    afterEach(async () => {
      const data = [];
      try {
        await fsp.writeFile(
          `${process.env.DATA_FOLDER}/category.json`,
          JSON.stringify(data)
        );
      } catch (err) {
        console.log(err);
      }
    });

    it("should sanatize inputs", async () => {
      const categoryModel = JSON.parse(JSON.stringify(testCategoryModel));
      categoryModel.title = "<img src=x onerror=alert(1)//>";

      const requestOptions = {
        body: { category: categoryModel },
      };

      const req = mockRequest(requestOptions);
      const res = mockResponse();

      await createNewCategory(req, res);

      categoryModel.title = '<img src="x">';
      categoryModel._id = ObjectId(categoryModel._id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(categoryModel);
    });

    it("should save user", async () => {
      const categoryModel = JSON.parse(JSON.stringify(testCategoryModel));

      const requestOptions = {
        body: { category: categoryModel },
      };

      const req = mockRequest(requestOptions);
      const res = mockResponse();

      await createNewCategory(req, res);

      const data = await fsp.readFile(
        `${process.env.DATA_FOLDER}/category.json`
      );
      const dataJson = JSON.parse(data);

      expect(res.status).toHaveBeenCalledWith(200);
      dataJson[0]._id = ObjectId(dataJson[0]._id);
      expect(res.send).toHaveBeenCalledWith(dataJson[0]);
    });
  });
});
