import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDrawerDispatch, useDrawerState } from '../../context/DrawerContext';
import Uploader from '../../components/Uploader/Uploader';
import Button, { KIND } from '../../components/Button/Button';
import DrawerBox from '../../components/DrawerBox/DrawerBox';
import { Row, Col } from '../../components/FlexBox/FlexBox';
import Input from '../../components/Input/Input';
import { Textarea } from '../../components/Textarea/Textarea';
import Select from '../../components/Select/Select';
import { FormFields, FormLabel } from '../../components/FormFields/FormFields';
import CategoryTypeDataService from "../../services/categorytype.service";
import ProductDataService from "../../services/product.service";

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';

const options = [
  { value: 'Fruits & Vegetables', name: 'Fruits & Vegetables', id: '1' },
  { value: 'Meat & Fish', name: 'Meat & Fish', id: '2' },
  { value: 'Purse', name: 'Purse', id: '3' },
  { value: 'Hand bags', name: 'Hand bags', id: '4' },
  { value: 'Shoulder bags', name: 'Shoulder bags', id: '5' },
  { value: 'Wallet', name: 'Wallet', id: '6' },
  { value: 'Laptop bags', name: 'Laptop bags', id: '7' },
  { value: 'Women Dress', name: 'Women Dress', id: '8' },
  { value: 'Outer Wear', name: 'Outer Wear', id: '9' },
  { value: 'Pants', name: 'Pants', id: '10' },
];

// const typeOptions = [
//   { value: 'grocery', name: 'Grocery', id: '1' },
//   { value: 'women-cloths', name: 'Women Cloths', id: '2' },
//   { value: 'bags', name: 'Bags', id: '3' },
//   { value: 'makeup', name: 'Makeup', id: '4' },
// ];

type Props = any;

const AddProduct: React.FC<Props> = () => {
  const dispatch = useDrawerDispatch();
  const data = useDrawerState('data');
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: data,
  });
  const [type, setType] = useState([{ value: data.type }]);
  const [tag, setTag] = useState([]);
  const [description, setDescription] = useState(data.description);
  const [typeOptions, setTypeOptions] = useState([]);

  React.useEffect(() => {
    CategoryTypeDataService.getAll()
    .then(response => {
      setTypeOptions(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }, [typeOptions.length])

  React.useEffect(() => {
    register({ name: 'type' });
    register({ name: 'categories' });
    register({ name: 'image' });
    register({ name: 'description' });
  }, [register]);

  const handleMultiChange = ({ value }) => {
    setValue('categories', value);
    setTag(value);
  };
  const handleDescriptionChange = e => {
    const value = e.target.value;
    setValue('description', value);
    setDescription(value);
  };

  const handleTypeChange = ({ value }) => {
    setValue('type', value);
    setType(value);
  };
  const handleUploader = files => {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      setValue('image', reader.result);
      console.log(reader.result)
    }, false);
  
    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
  };
  const onSubmit = data => {
    const updatedProduct = {
      id: data.id,
      name: data.name,
      type: data.type[0].value,
      description: data.description,
      image: data.image,
      price: Number(data.price),
      unit: data.unit,
      sale_price: Number(data.sale_price),
      discount_in_percent: Number(data.discount_in_percent),
      quantity: Number(data.quantity),
      slug: data.name,
      created_date: new Date(),
    };
    updateProduct(updatedProduct);
    console.log(updatedProduct, 'updatedProduct data');
    closeDrawer();
  };

  function updateProduct(updatedProduct) {
    ProductDataService.update(updatedProduct.id, updatedProduct)
      .then(response => {
        console.log(response.data);
        window.location.href = window.location.href;
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Update Product</DrawerTitle>
      </DrawerTitleWrapper>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ height: '100%' }}
        noValidate
      >
        <Scrollbars
          autoHide
          renderView={props => (
            <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
          )}
          renderTrackHorizontal={props => (
            <div
              {...props}
              style={{ display: 'none' }}
              className="track-horizontal"
            />
          )}
        >
          <Input type="hidden" inputRef={register} name="id" value={data.id} />
          <Row>
            <Col lg={4}>
              <FieldDetails>Upload your Product image here</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox>
                <Uploader onChange={handleUploader} imageURL={data.image} />
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
                Add your Product description and necessary information from here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Name</FormLabel>
                  <Input
                    inputRef={register({ required: true, maxLength: 20 })}
                    name="name"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Unit</FormLabel>
                  <Input type="text" inputRef={register} name="unit" />
                </FormFields>

                <FormFields>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="price"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Sale Price</FormLabel>
                  <Input type="number" inputRef={register} name="sale_price" />
                </FormFields>

                <FormFields>
                  <FormLabel>Discount In Percent</FormLabel>
                  <Input
                    type="number"
                    inputRef={register}
                    name="discount_in_percent"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Product Quantity</FormLabel>
                  <Input type="number" inputRef={register} name="quantity" />
                </FormFields>

                <FormFields>
                  <FormLabel>Type</FormLabel>
                  <Select
                    options={typeOptions}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Product Type"
                    value={type}
                    searchable={false}
                    onChange={handleTypeChange}
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      OptionContent: {
                        style: ({ $theme, $selected }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $selected
                              ? $theme.colors.textDark
                              : $theme.colors.textNormal,
                          };
                        },
                      },
                      SingleValue: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      Popover: {
                        props: {
                          overrides: {
                            Body: {
                              style: { zIndex: 5 },
                            },
                          },
                        },
                      },
                    }}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Product Tag"
                    value={tag}
                    onChange={handleMultiChange}
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      Popover: {
                        props: {
                          overrides: {
                            Body: {
                              style: { zIndex: 5 },
                            },
                          },
                        },
                      },
                    }}
                    multi
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeDrawer}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                  marginRight: '15px',
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                }),
              },
            }}
          >
            Update Product
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddProduct;
