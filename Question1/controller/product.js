const db= require('../config/db');
const getProductDetails = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('Missing product ID');
  }

  const query = `
    SELECT p.*,c.id_category,c.name AS category_name
    FROM products p
    JOIN category c ON p.category_id = c.id_category
    WHERE p.id_products = ?;
  `;


  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send('Database query failed');
    }

    if (results.length === 0) {
      return res.status(404).send('Product not found');
    }

    res.json(results[0]);
  });
};
const getProducts = async(req, res) => {
  try {
    const { page } = req.query;
    const currentPage = parseInt(page, 10) || 1;
    const limit = 10;
    const offset = (currentPage - 1) * limit;

    const [data] = await db
      .promise()
      .query("SELECT * FROM products LIMIT ? OFFSET ?", [limit, offset]);

    res.status(200).json({ message: "Products retrieved", data: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getTopProducts=  async(req, res) => {
    const { companyId, categoryId, minPrice, maxPrice, limit, page } = req.query;
  
    if (!companyId || !categoryId || !minPrice || !maxPrice || !limit || !page) {
      return res.status(400).send('Missing query parameters');
    }
  
    const offset = (parseInt(page) - 1) * parseInt(limit);
  
    const query = `
  SELECT p.id_products AS id, p.name_pro AS title, p.rating, p.price, c.name AS categories
  FROM products p
  JOIN category c ON p.category_id = c.id_category
  JOIN companies co ON c.company_id = co.company_id
  WHERE co.company_id = ? AND c.id_category = ? AND p.price BETWEEN ? AND ?
  ORDER BY p.rating DESC
  LIMIT ? OFFSET ?;
`;

const countQuery = `
  SELECT COUNT(*) AS total_records
  FROM products p
  JOIN category c ON p.category_id = c.id_category
  JOIN companies co ON c.company_id = co.company_id
  WHERE co.company_id = ? AND c.id_category = ? AND p.price BETWEEN ? AND ?;
`;

  
    db.query(
      countQuery,
      [companyId, categoryId, minPrice, maxPrice],
      (err, countResults) => {
        if (err) {
          return res.status(500).send('Database query failed');
        }
  
        const totalRecords = countResults[0].total_records;
        const totalPages = Math.ceil(totalRecords / parseInt(limit));
  
        db.query(
          query,
          [companyId, categoryId, minPrice, maxPrice, parseInt(limit), offset],
          (err, results) => {
            if (err) {
              return res.status(500).send('Database query failed');
            }
  
            res.json({
              data: results,
              pagination: {
                total_records: totalRecords,
                current_page: parseInt(page),
                total_pages: totalPages,
                next_page: parseInt(page) < totalPages ? parseInt(page) + 1 : null,
                prev_page: parseInt(page) > 1 ? parseInt(page) - 1 : null,
              },
            });
          }
        );
      }
    );
    }


module.exports = {
    getProducts,
    
    getTopProducts,
    getProductDetails,

};