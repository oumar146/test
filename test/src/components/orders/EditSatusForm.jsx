import SelectTextField from "../form/SelectTextField";
import TextFields from "../form/TextFields";


const EditSatusForm = (props) => {

  return (
    <div>
      {props.data ? (
        <div>
          <TextFields
            defaultValue={props.data.order_id}
            label="Référence de la commande"
            disabled
            fullWidth
          />
  

          <TextFields
            defaultValue={props.data.user_email}
            label="Email du client"
            disabled
            fullWidth
          />


          <TextFields
            defaultValue={props.data.created_at}
            label="Date de la commande"
            disabled
            fullWidth
          />

          <SelectTextField
            defaultValue={props.data.order_status}
            datas={props.statuses}
            setData={props.setStatus_id}
            label="Status"
          />
        </div>
      ) : (
        <h5>Impossible de modifier</h5>
      )}
    </div>
  );
};

export default EditSatusForm;
