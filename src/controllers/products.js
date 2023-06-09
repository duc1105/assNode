import joi from "joi";
import Product from "../models/products";
import Category from "../models/category";

const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    image: joi.array(),
    description: joi.string(),
    categoryId: joi.string().required()
});

// export const getAll = async (req, res) => {
//     try {
//         const { _sort = "createAt", _order = "asc", _limit = 10, _page = 1 } = req.query;
//     const options = {
//         page: _page,
//         limit: _limit,
//         sort: {
//             [_sort]: _order === "desc" ? -1 : 1,
//         },
//     };
//     const products = await Product.paginate({}, options);
//         if (products.length === 0) {
//             return res.json({
//                 message: "Không có sản phẩm nào",
//             });
//         }
//         return res.json(products);
//     } catch (error) {
//         return res.status(400).json({
//             message: error,
//         });
//     }
// };


export const getAll  = async (req, res) => {

    const { _sort = "createAt", _order = "_asc", _limit = 20, _page = 1, _keywords } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: { [_sort]: _order === "desc" ? -1 : 1 },
    };

    try {
        const searchData = (products) => {
            return products?.docs?.filter((item) => item.name.toLowerCase().includes(_keywords))
        }
        const products = await Product.paginate({}, options);

        if (products.lenghth === 0) {
            return res.json({
                message: 'Không có sản phẩm nào',
            })
        }
        else {
            const searchDataProduct = await searchData(products)
            const productsRespone = await {...products, docs: searchDataProduct}
            return res.json(productsRespone);
        }

    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};


export const get = async function (req, res) {
    try {
        const product = await Product.findById(req.params.id).populate("categoryId");
        if (!product) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(product);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const create = async function (req, res) {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const product = await Product.create(req.body);
        if (!product) {
            return res.json({
                message: "Không thêm sản phẩm",
            });
        }
        return res.json({
            message: "Thêm sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async function (req, res) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body)
        if (!product) {
            return res.json({
                message: "Cập nhật sản phẩm không thành công",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const remove = async function (req, res) {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.json({
            message: "Xóa sản phẩm thành công",
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
