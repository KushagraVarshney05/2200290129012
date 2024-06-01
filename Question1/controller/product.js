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
    
    getTopProducts

};