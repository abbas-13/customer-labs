import { Button, Form, Input, message, Select } from "antd";
import classNames from "classnames";

import styles from "./addSegment.module.css";

const AddSegment = ({ closeDrawer }) => {
  const [addSegmentForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // state to track selected value
  const allOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  // function on selecting an option, filters the options
  const handleSelectChange = () => {
    const formValues = addSegmentForm.getFieldsValue();
    const selectedValues = formValues?.segments?.map((item) => {
      return item?.schema;
    });

    const currentAvValues = allOptions.filter(
      (option) => !selectedValues.includes(option.value)
    );
    return currentAvValues;
  };

  // for the color of the circle which represents traits
  const getCircleColor = (selectedValue) => {
    if (!selectedValue) return "bg-gray-400"; // default color
    if (["first_name", "last_name"].includes(selectedValue.schema))
      return "bg-green-500"; // user traits
    return "bg-red-500"; // group traits
  };

  const handleFinish = async (values) => {
    try {
      const data = {
        segment_name: values.segmentName,
        schema: values.segments.map((item) => ({
          [item.schema]: allOptions.filter(
            (option) => option.value === item.schema
          )[0].label,
        })),
      };

      await fetch(
        `https://webhook.site/eeaf401b-7ca0-4e59-9f2b-287b9f6f9995/requests`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
    } catch (err) {
      if (
        err.message === "Cannot read properties of undefined (reading 'label')"
      ) {
        messageApi.open({
          type: "error",
          content: "Please select from all dropdowns, or remove the empty ones",
        });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <p className="mt-8 ml-4">Enter the name of the segment</p>
      <Form
        onFinish={handleFinish}
        initialValues={{ segments: [] }}
        form={addSegmentForm}
        name="addSegmentForm"
        className="h-[calc(100%-50px)] flex justify-between flex-col"
      >
        <div className="px-4">
          <Form.Item
            name="segmentName"
            rules={[{ required: true, message: "Please enter segment name" }]}
          >
            <Input
              placeholder="Name of the segment"
              className="rounded-none my-[1rem] mx-0"
            />
          </Form.Item>

          <p>
            To save your segment, you need to add the schemas to build the query
          </p>

          <div className={styles["badges-container"]}>
            <div className={styles["badge-container"]}>
              <div className={styles["user-traits-badge"]}></div>
              <p> - User Traits</p>
            </div>
            <div className={styles["badge-container"]}>
              <div className={styles["group-traits-badge"]}></div>
              <p> - Group Traits</p>
            </div>
          </div>

          {/* ant design's form list component, used to add form items  */}
          <Form.List name="segments">
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    const selectedValue =
                      addSegmentForm.getFieldsValue().segments[name];

                    return (
                      <div className={styles["form-item-container"]}>
                        <div
                          className={classNames(
                            "h-3 w-3 rounded-full",
                            getCircleColor(selectedValue)
                          )}
                        ></div>
                        <Form.Item
                          className="mb-0 w-[75%]"
                          {...restField}
                          name={[name, "schema"]}
                          key={key}
                          rules={[
                            {
                              required: true,
                              message: "Please select schema option",
                            },
                          ]}
                        >
                          <Select
                            className="h-[48px] rounded-none"
                            placeholder="Add schema to segment"
                            options={handleSelectChange()}
                          />
                        </Form.Item>
                        <div
                          className={styles["remove-button-main"]}
                          onClick={() => {
                            remove(name);
                            handleSelectChange();
                          }}
                        >
                          <div className={styles["remove-button-inside"]}></div>
                        </div>
                      </div>
                    );
                  })}
                  <Form.Item className="w-max">
                    <p
                      className={classNames(
                        "underline underline-offset-8",
                        fields.length < allOptions.length
                          ? "text-[#57AA8E] cursor-pointer"
                          : "text-[#D3D3D3] cursor-not-allowed"
                      )}
                      onClick={() => {
                        if (fields.length < allOptions.length) {
                          add();
                        }
                      }}
                    >
                      + Add new schema
                    </p>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
        </div>
        <Form.Item className="m-0">
          <div className={styles["buttons-container"]}>
            <Button
              className="text-white bg-[#57AA8E] h-[42px]"
              htmlType="submit"
            >
              Save the segment
            </Button>
            <Button className="h-[42px] text-red" onClick={closeDrawer}>
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddSegment;
