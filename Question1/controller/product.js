const db= require('../config/db');
const getProducts = (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err
        , result) => {
        if (err) {
            res.status(400).send('Error fetching products');
            return;
        }
        res.status(200).send(result);
    }
    );
}
const insertProduct = (req, res) => {
    const { name, price } = req.body;
    const query = `INSERT INTO products (product_name, product_price) VALUES ('${name}', '${price}')`;
    db.query(query, (err, result) => {
        if (err) {
            res.status(400).send('Error inserting product');
            return;
        }
        res.status(200).send('Product inserted');
    });
}   
const getTopNProducts = (req, res) => {
const { minPrice, maxPrice, topN } = req.query;
    const query = `SELECT * FROM products WHERE price >= ${minPrice} AND price <= ${maxPrice} ORDER BY rating DESC LIMIT ${topN}`;
    db.query(query, (err, result) => {
        if (err) {
            res.status(400).send('Error fetching products');
            return;
        }
        res.status(200).send(result);
    });
};
const getProductsByCategory=async (req, res) => {
    try {
      const { company_id, category_name } = req.query;
      console.log(company_id, category_name);
  
      const [data] = await db.promise().query(
        `SELECT p.id_products, p.name_pro, p.price, p.rating, p.discount, p.availability, c.name AS category_name, com.company_name
                FROM products p
                JOIN category c ON p.category_id = c.id_category
                JOIN companies com ON c.company_id = com.company_id
                WHERE com.company_id = ? AND c.name = ?`,
        [company_id, category_name]
      );
  
      res.status(200).json({ message: "Products retrieved", data: data });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  };
  const getTopProducts = async (req, res) => {
    try {
      const { company_id, category_name, order, limit, page } = req.query;
      const validOrders = ["min", "max"];
  
      if (!validOrders.includes(order)) {
        return res
          .status(400)
          .json({ error: "Invalid order parameter. Use 'min' or 'max'." });
      }
  
      const orderBy = order === "min" ? "ASC" : "DESC";
      const productLimit = parseInt(limit, 10) || 10;
      const currentPage = parseInt(page, 10) || 1;
      const offset = (currentPage - 1) * productLimit;
  
      console.log(company_id, category_name, order, productLimit, currentPage);
  
      const [data] = await db.promise().query(
        `SELECT p.id_products, p.name_pro, p.price, p.rating, p.discount, p.availability, c.name AS category_name, com.company_name
            FROM products p
            JOIN category c ON p.category_id = c.id_category
            JOIN companies com ON c.company_id = com.company_id
            WHERE com.company_id = ? AND c.name = ?
            ORDER BY p.price ${orderBy}
            LIMIT ? OFFSET ?`,
        [company_id, category_name, productLimit, offset]
      );
  
      res.status(200).json({ message: "Top products retrieved", data: data });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }
  
  const getProductsByPriceRange= async (req, res) => {
    try {
      const { company_id, category_name, min_price, max_price, limit, page } =
        req.query;
  
      const minPrice = parseFloat(min_price) || 0;
      const maxPrice = parseFloat(max_price) || Number.MAX_SAFE_INTEGER;
      const productLimit = parseInt(limit, 10) || 10;
      const currentPage = parseInt(page, 10) || 1;
      const offset = (currentPage - 1) * productLimit;
  
      console.log(
        company_id,
        category_name,
        minPrice,
        maxPrice,
        productLimit,
        currentPage
      );
  
      const [data] = await db.promise().query(
        `SELECT p.id_products, p.name_pro, p.price, p.rating, p.discount, p.availability, c.name AS category_name, com.company_name
            FROM products p
            JOIN category c ON p.category_id = c.id_category
            JOIN companies com ON c.company_id = com.company_id
            WHERE com.company_id = ? AND c.name = ? AND p.price BETWEEN ? AND ?
            LIMIT ? OFFSET ?`,
        [company_id, category_name, minPrice, maxPrice, productLimit, offset]
      );
  
      res.status(200).json({ message: "Products retrieved", data: data });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }


module.exports = {
    getProducts,
    insertProduct,
    getTopNProducts,
    getProductsByCategory,
    getTopProducts,
    getProductsByPriceRange

};