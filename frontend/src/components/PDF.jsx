import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f8f8f8",
  },
  header: {
    width: "100%",
    marginTop: "20px",
  },
  center: {
    width: "90%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    padding: "35px 0",
  },
  section: {
    display: "flex",
    flexDirection: "column",
  },
  date: {
    width: "40%",
    height: "100px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  dateText: {
    fontSize: "15",
    marginLeft: "5px",
  },
  info: {
    width: "100%",
    minHeight: "0",
    marginTop: "30px",
    marginBottom: "60px",
  },
  info_item: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  info_item__ipt: {
    width: "80%",
    borderBottom: "1px solid black",
    textAlign: "center",
    backgroundColor: "#EDEDED",
    marginLeft: "5px",
  },
  centerTable: {
    width: "90%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  table: {
    display: "table",
    width: "100%",
    marginTop: "70px",
    border: "1px solid black",
  },
  tableRow: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableCell: {
    margin: "auto",
    marginVertical: 5,
  },
  tableCell1: {
    width: "50%",
    textAlign: "center",
    padding: "10px 0",
  },
  tableCell2: {
    width: "20%",
    textAlign: "center",
    padding: "10px 0",
  },
  total: {
    width: "100%",
    textAlign: "right",
    fontSize: "30px",
    marginTop: "50px",
  },
});

function PDF(props) {
  const renderTable = () => {
    if (props.detail) {
      const detailArray = JSON.parse(props.detail);
      return (
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text
              style={[
                styles.tableCell1,
                {
                  fontWeight: "bold",
                  backgroundColor: "#dadada",
                  border: "1px solid black",
                },
              ]}
            >
              Nombre
            </Text>
            <Text
              style={[
                styles.tableCell2,
                {
                  fontWeight: "bold",
                  backgroundColor: "#dadada",
                  border: "1px solid black",
                },
              ]}
            >
              Precio
            </Text>
            <Text
              style={[
                styles.tableCell2,
                {
                  fontWeight: "bold",
                  backgroundColor: "#dadada",
                  border: "1px solid black",
                },
              ]}
            >
              Cantidad
            </Text>
            <Text
              style={[
                styles.tableCell2,
                {
                  fontWeight: "bold",
                  backgroundColor: "#dadada",
                  border: "1px solid black",
                },
              ]}
            >
              Subtotal
            </Text>
          </View>
          {detailArray.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={[styles.tableCell1, { border: "1px solid black" }]}>
                {item.name}
              </Text>
              <Text style={[styles.tableCell2, { border: "1px solid black" }]}>
                {item.price}
              </Text>
              <Text style={[styles.tableCell2, { border: "1px solid black" }]}>
                {item.quantity}
              </Text>
              <Text style={[styles.tableCell2, { border: "1px solid black" }]}>
                {item.subtotal}
              </Text>
            </View>
          ))}
        </View>
      );
    } else {
      return null;
    }
  };

  //Obtener la fecha actual
  var date = new Date();
  var day = date.getDate();
  var mounth = date.getMonth() + 1;
  var year = date.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (mounth < 10) {
    mounth = "0" + mounth;
  }

  var dateFormat = day + "/" + mounth + "/" + year;

  var hours = date.getHours();
  var minutes = date.getMinutes();

  
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  // Formatear la hora
  var hourFormat = hours + ":" + minutes;

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <View style={styles.center}>
            <Text style={styles.title}>FACTURA</Text>
            <View style={styles.date}>
              <Text style={styles.dateText}>{dateFormat}</Text>
              <Text style={styles.dateText}>{hourFormat}</Text>
            </View>
          </View>
        </View>

        <View style={styles.center}>
          <View style={styles.info}>
            <View style={styles.info_item}>
              <Text>Empresa: </Text>
              <Text style={styles.info_item__ipt}>Restaurante</Text>
            </View>

            <View style={styles.info_item}>
              <Text>Domicilio: </Text>
              <Text style={styles.info_item__ipt}>
                Av. Lorem Ipsum 2300 - CABA
              </Text>
            </View>

            <View style={styles.info_item}>
              <Text>Teléfono: </Text>
              <Text style={styles.info_item__ipt}>4999-8888</Text>
            </View>

            <View style={styles.info_item}>
              <Text>CUIL: </Text>
              <Text style={styles.info_item__ipt}>23-00000000-9</Text>
            </View>
          </View>
        </View>

        <View style={styles.centerTable}>{renderTable()}</View>

        <View style={styles.center}>
          <View style={styles.total}>
            <Text>Total: ${props.total}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PDF;
