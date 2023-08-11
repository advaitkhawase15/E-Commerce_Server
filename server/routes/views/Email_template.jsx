const { View } = require("grandjs/lib");

const Style = {
    table: {
        fontFamily: "arial, sans-serif",
        borderCollapse: "collapse",
        width: "100%",
    },
    td_th: {
        border: "1px solid #dddddd",
        textAlign: "left",
        padding: "8px",
    }
}

const Email_template = (props) => {
    const { Customer_Info, Products, TotalPrice } = props;
    return (
        <div>
            <h1><a style={{ textDecoration: "none", color: "black" }} href="http://localhost:5000/send">E-commerce</a></h1>
            <hr />
            <h2>Hello {Customer_Info.Name},</h2>
            <p>Thank you for your order. We will send a confirmation when your order ships. If you would like to make any changes to your order, please Contact us.</p>
            <hr />
            <h2>Order Summmary</h2>
            <br />
            <table style={Style.table}>
                <tr>
                    <th style={Style.td_th}>Product Name</th>
                    <th style={Style.td_th}>Product Size</th>
                    <th style={Style.td_th}>Quantity</th>
                    <th style={Style.td_th}>Retail Price</th>
                    <th style={Style.td_th}>Total</th>
                </tr>
                {Products.map((Current_Item) => {
                    const Current_TotalPrice = Current_Item.discounted_price * Current_Item.quantity;
                    return (
                        <tr>
                            <td style={Style.td_th}>
                                <a href={`http://localhost:3000/product_detail/${Current_Item.id}`}>
                                    {Current_Item.product_name.toString()}
                                </a>
                            </td>
                            <td style={Style.td_th}>
                                {Current_Item.product_size.toString()}
                            </td>
                            <td style={Style.td_th}>
                                {Current_Item.quantity.toString()}
                            </td>
                            <td style={Style.td_th}>
                                &#8377;{Current_Item.discounted_price.toString()}.00
                            </td>
                            <td style={Style.td_th}>
                                &#8377;{Current_TotalPrice.toString()}.00
                            </td>
                        </tr>
                    )
                })}
                <tr>
                    <td style={{ borderLeft: "1px solid #dddddd", borderBottom: "1px solid #dddddd", padding: "8px" }}> 12% GST </td>
                    <td style={{ borderBottom: "1px solid #dddddd", padding: "8px" }}></td>
                    <td style={{ borderBottom: "1px solid #dddddd", padding: "8px" }}></td>
                    <td style={{ borderBottom: "1px solid #dddddd", padding: "8px" }}></td>
                    <td style={{ borderLeft: "1px solid #dddddd", borderRight: "1px solid #dddddd", borderBottom: "1px solid #dddddd", padding: "8px" }}>
                        &#8377; {(Math.round(((TotalPrice / 100) * 12) * 100) / 100).toString()}
                    </td>
                </tr>
                <tr>
                    <td style={{ borderLeft: "1px solid #dddddd", borderBottom: "1px solid #dddddd", padding: "8px" }}>Total Amount </td>
                    <td style={{ borderBottom: "1px solid #dddddd", padding: "8px" }}></td>
                    <td style={{ borderBottom: "1px solid #dddddd", padding: "8px" }}></td>
                    <td style={{ borderBottom: "1px solid #dddddd", padding: "8px" }}></td>
                    <td style={{ borderLeft: "1px solid #dddddd", borderRight: "1px solid #dddddd", borderBottom: "1px solid #dddddd", padding: "8px" }}>
                        &#8377; {(Math.round(((Number(TotalPrice) / 100) * 12 + Number(TotalPrice)) * 100) / 100).toString()}
                    </td>
                </tr>
            </table>
        </div>
    )
}

module.exports = Email_template;