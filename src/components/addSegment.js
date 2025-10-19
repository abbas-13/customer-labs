import { Button, Form, Input, Select } from "antd";
import { useState } from "react";

const AddSegment = () => {
  const [addSegmentForm] = Form.useForm();
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
  const [availableOptions, setAvailableOptions] = useState(allOptions);

  // function on selecting an option, to keep track of selected values, based on which available options will be filtered
  const handleSelectChange = () => {
    const formValues = addSegmentForm.getFieldsValue();

    const selectedValues = formValues.segments.map((item) => {
      return item?.schema;
    });

    const currentAvValues = allOptions.filter(
      (option) => !selectedValues.includes(option.value)
    );

    setAvailableOptions(currentAvValues);
  };

  // for the color of the circle which represents traits
  const getCircleColor = (selectedValue) => {
    if (!selectedValue) return "bg-gray-400"; // default color
    if (["first_name", "last_name"].includes(selectedValue.schema))
      return "bg-green-500"; // user traits
    return "bg-red-500"; // group traits
  };

  const handleFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <p className="mt-8 ml-4">Enter the name of the segment</p>
      <Form
        onFinish={handleFinish}
        initialValues={{ segments: [] }}
        form={addSegmentForm}
        name="addSegmentForm"
        style={{
          height: "calc(100% - 50px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="px-4">
          <Form.Item name="segmentName">
            <Input
              placeholder="Name of the segment"
              style={{ borderRadius: "0", margin: "1rem 0" }}
            />
          </Form.Item>

          <p>
            To save your segment, you need to add the schemas to build the query
          </p>

          <div className="flex gap-4 my-4 justify-end">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <p> - User Traits</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
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
                    console.log(selectedValue);
                    return (
                      <div className="flex w-full gap-1 justify-between items-center mb-4">
                        <div
                          className={`h-3 w-3 rounded-full ${getCircleColor(
                            selectedValue
                          )}`}
                        ></div>
                        <Form.Item
                          style={{ marginBottom: "0", width: "75%" }}
                          {...restField}
                          name={[name, "schema"]}
                          key={key}
                        >
                          <Select
                            style={{
                              height: "48px",
                              borderRadius: "0 !important",
                            }}
                            placeholder="Add schema to segment"
                            options={availableOptions}
                            onChange={handleSelectChange}
                          />
                        </Form.Item>
                        <div
                          className="h-[48px] w-[48px] p-2 flex items-center rounded-md bg-[#F2FAF8]"
                          onClick={() => {
                            remove(name);
                            handleSelectChange();
                          }}
                        >
                          <div className="bg-[#5F6E87] rounded-md w-full h-1"></div>
                        </div>
                      </div>
                    );
                  })}
                  <Form.Item>
                    <p
                      className={`underline underline-offset-8 text-[#57AA8E]`}
                      style={{
                        color:
                          fields.length < allOptions.length
                            ? "#57AA8E"
                            : "#D3D3D3",
                        cursor:
                          fields.length < allOptions.length
                            ? "pointer"
                            : "not-allowed",
                      }}
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
        <Form.Item style={{ margin: "0" }}>
          <div className="flex gap-3 h-24 bg-gray-100 items-center p-2 pl-4">
            <Button
              htmlType="submit"
              style={{
                backgroundColor: "#57AA8E",
                color: "white",
                height: "42px",
              }}
            >
              Save the segment
            </Button>
            <Button style={{ height: "42px", color: "red" }}>Cancel</Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddSegment;
