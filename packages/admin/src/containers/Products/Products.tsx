import React, { useCallback,useState } from 'react';
import { styled, withStyle } from 'baseui';
import Button from '../../components/Button/Button';
import {
  Grid,
  Row as Rows,
  Col as Column,
} from '../../components/FlexBox/FlexBox';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Header, Heading } from '../../components/WrapperStyle';
import Fade from 'react-reveal/Fade';
import ProductCard from '../../components/ProductCard/ProductCard';
import NoResult from '../../components/NoResult/NoResult';
import { CURRENCY } from '../../settings/constants';
import Placeholder from '../../components/Placeholder/Placeholder';
import { useDrawerDispatch } from '../../context/DrawerContext';
import CategoryTypeDataService from "../../services/categorytype.service";
import ProductDataService from "../../services/product.service";
import {
  Plus,
} from '../../components/AllSvgIcon';
export const ProductsRow = styled('div', ({ $theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '25px',
  backgroundColor: $theme.colors.backgroundF7,
  position: 'relative',
  zIndex: '1',

  '@media only screen and (max-width: 767px)': {
    marginLeft: '-7.5px',
    marginRight: '-7.5px',
    marginTop: '15px',
  },
}));

export const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  '@media only screen and (min-width: 768px) and (max-width: 991px)': {
    alignItems: 'center',
  },
}));

export const ProductCardWrapper = styled('div', () => ({
  height: '100%',
}));

export const LoaderWrapper = styled('div', () => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexWrap: 'wrap',
}));

export const LoaderItem = styled('div', () => ({
  width: '25%',
  padding: '0 15px',
  marginBottom: '30px',
}));

const GET_PRODUCTS = gql`
  query getProducts(
    $type: String
    $sortByPrice: String
    $searchText: String
    $offset: Int
  ) {
    products(
      type: $type
      sortByPrice: $sortByPrice
      searchText: $searchText
      offset: $offset
    ) {
      items {
        id
        name
        description
        image
        type
        price
        unit
        salePrice
        discountInPercent
      }
      totalCount
      hasMore
    }
  }
`;

// const typeSelectOptions = [
//   { value: 'grocery', label: 'Grocery' },
//   { value: 'women-cloths', label: 'Women Cloths' },
//   { value: 'bags', label: 'Bags' },
//   { value: 'makeup', label: 'Makeup' },
// ];
const priceSelectOptions = [
  { value: 'highestToLowest', label: 'Highest To Lowest' },
  { value: 'lowestToHighest', label: 'Lowest To Highest' },
];

export default function Products() {
  //const { data, error, refetch, fetchMore } = useQuery(GET_PRODUCTS);
  const [loadingMore, toggleLoading] = useState(false);
  const [type, setType] = useState([]);
  const [priceOrder, setPriceOrder] = useState([]);
  const [search, setSearch] = useState([]);
  const [typeSelectOptions, setTypeSelectOptions] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDrawerDispatch();
  const openDrawer = useCallback(
    () => dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'PRODUCT_FORM' }),
    [dispatch]
  );
  React.useEffect(() => {
    CategoryTypeDataService.getAll()
      .then(response => {
        setTypeSelectOptions(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [typeSelectOptions.length])

  React.useEffect(() => {
    ProductDataService.findAll("", "", "", 12)
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [typeSelectOptions.length])

  // if (error) {
  //   return <div>Error! {error.message}</div>;
  // }
  function loadMore() {
    toggleLoading(true);
    ProductDataService.findAll(type.length ? type[0].value : '', priceOrder.length ? priceOrder[0].value : '', search, products.length + 12)
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
        toggleLoading(false);
      })
      .catch(e => {
        console.log(e);
        toggleLoading(false);
      });
  }
  function handlePriceSort({ value }) {
    setPriceOrder(value);
    if (value.length) {
      ProductDataService.findAll(type.length ? type[0].value : '', value[0].value, search, 12 * Math.ceil(products.length / 12))
        .then(response => {
          setProducts(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      // refetch({
      //   sortByPrice: value[0].value,
      // });
    } else {
      ProductDataService.findAll(type.length ? type[0].value : '', '', search, 12 * Math.ceil(products.length / 12))
        .then(response => {
          setProducts(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      // refetch({
      //   sortByPrice: null,
      // });
    }
  }
  function handleCategoryType({ value }) {
    setType(value);
    if (value.length) {
      ProductDataService.findAll(value[0].value, priceOrder.length ? priceOrder[0].value : '', search, 12 * Math.ceil(products.length / 12))
        .then(response => {
          setProducts(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      // refetch({
      //   type: value[0].value,
      // });
    } else {
      ProductDataService.findAll('', priceOrder.length ? priceOrder[0].value : '', search, 12 * Math.ceil(products.length / 12))
        .then(response => {
          setProducts(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      // refetch({
      //   type: null,
      // });
    }
  }
  function handleSearch(event) {
    const value = event.currentTarget.value;
    setSearch(value);
    ProductDataService.findAll(type.length ? type[0].value : '', priceOrder.length ? priceOrder[0].value : '', value, 12 * Math.ceil(products.length / 12))
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    // refetch({ searchText: value });
  }

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header style={{ marginBottom: 15 }}>
            <Col md={2} xs={12}>
              <Heading>Products</Heading>
            </Col>

            <Col md={10} xs={12}>
              <Row>
                <Col md={3} xs={12}>
                  <Select
                    options={typeSelectOptions}
                    labelKey='name'
                    valueKey='value'
                    placeholder='Category Type'
                    value={type}
                    searchable={false}
                    onChange={handleCategoryType}
                  />
                </Col>

                <Col md={2} xs={12}>
                  <Select
                    options={priceSelectOptions}
                    labelKey='label'
                    valueKey='value'
                    value={priceOrder}
                    placeholder='Price'
                    searchable={false}
                    onChange={handlePriceSort}
                  />
                </Col>

                <Col md={5} xs={12}>
                  <Input
                    value={search}
                    placeholder='Ex: Search By Name'
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={2} xs={12}>
                  <Button
                    onClick={openDrawer}
                    startEnhancer={() => <Plus />}
                    overrides={{
                      BaseButton: {
                        style: () => ({
                          width: '100%',
                          borderTopLeftRadius: '3px',
                          borderTopRightRadius: '3px',
                          borderBottomLeftRadius: '3px',
                          borderBottomRightRadius: '3px',
                        }),
                      },
                    }}
                  >
                    Add Product
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Row>
              {products && products.length !== 0 ? (
                products.map((item: any, index: number) => (
                  <Col
                    md={4}
                    lg={3}
                    sm={6}
                    xs={12}
                    key={index}
                    style={{ margin: '15px 0' }}
                  >
                    <Fade bottom duration={800} delay={index * 10}>
                      <ProductCard
                        title={item.name}
                        weight={item.unit}
                        image={item.image}
                        currency={CURRENCY}
                        price={item.price}
                        salePrice={item.sale_price}
                        discountInPercent={item.discount_in_percent}
                        data={item}
                      />
                    </Fade>
                  </Col>
                ))
              ) : (
                <NoResult />
              )}
          </Row>
          {products && (
            <Row>
              <Col
                md={12}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button onClick={loadMore} isLoading={loadingMore}>
                  Load More
                </Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Grid>
  );
}
