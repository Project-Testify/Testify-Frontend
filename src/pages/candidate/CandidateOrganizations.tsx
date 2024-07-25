import { Card, Typography, Col, Row, Image, Flex, Dropdown, Button, Menu, Badge } from 'antd';
import { COLOR } from '../../App';
import { HomeFilled, PhoneFilled } from '@ant-design/icons';

export const CandidateOrganizations = () => {
  
  const  organizations = [
    {
      key:1,
      name: 'University of Colombo School of Computing',
      address: '35, Reid Avenue, Colombo 00700',
      contact: '011 2581245',
      img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjh8HCAzjZbfXikaInHueqXzhxl9UzKtQhWw&s',
      verified: true,
      exams: [
        {
          key:1,
          label:<a href='#'>Python Programming</a>
        },
        {
          key:2,
          label:<a href='#'>Java Programming</a>
        }

      ]
    },
    {
      key:2,
      name: 'Institute of Java and Software Engineering',
      address: 'No. 1, Galle Road, Colombo 00300',
      contact: '011 2581245',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5LccFPVcf9Hh3tb_YCTkki_UlFoe-N4rj2Q&s',
      verified: false,
      exams: [
        {
          key:1,
          label:<a href='#'>Python Programming</a>
        },
        {
          key:2,
          label:<a href='#' style={{textDecoration:'none'}}>Java Programming</a>
        }

      ]
    },
    {
      key:3,
      name: 'Ocean University of Sri Lanka',
      address: 'Katubedda, Moratuwa 10400',
      contact: '011 2581245',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV2-DHBPr2I-QGhnWSnqW1LFlINkS98DCENA&s',
      verified: true,
      exams: [
        {
          key:1,
          label:<a href='#'>Python Programming</a>
        }

      ]
    },
    
  ]


  return ( 
    <div>
      <Typography.Title level={3}>Your Organizations</Typography.Title>
      <Row gutter={[20,20]}>
          {organizations.map((org) => (
            <Col lg={8}>
              {org.verified && (<Badge.Ribbon text='Verified' color='green' style={{ fontSize: '12px' }}>
              <Card key={org.name}>
                  <Flex align='center' style={{marginBottom:'20px'}}>
                    <Image src={org.img} style={{width:'50%'}} preview={false}/>
                    <Typography.Title level={4}>{org.name}</Typography.Title>
                  </Flex>

                  <Flex justify='space-between' align='center'>
                    <Flex vertical>
                      <Flex><HomeFilled></HomeFilled><Typography.Text style={{marginLeft:'10px'}}>{org.address}</Typography.Text></Flex>
                      <Flex><PhoneFilled></PhoneFilled><Typography.Text style={{marginLeft:'10px'}}>{org.contact}</Typography.Text></Flex>
                    </Flex>
                    
                    <Dropdown
                      overlay={
                        <Menu style={{backgroundColor:COLOR['50']}}>
                          {org.exams.map((exam) => (
                            <Menu.Item key={exam.key}>
                              <Typography.Text style={{color:'black'}}>{exam.label}</Typography.Text>  
                            </Menu.Item>
                          ))}
                        </Menu>
                      } placement='bottom' arrow>
                      
                      <Button style={{backgroundColor:COLOR['500'], color:'white', border:'none'}}>
                        View Exams
                      </Button>
                    </Dropdown>
                  </Flex>
              </Card>
            </Badge.Ribbon>)}
            
            {!org.verified && (
              <Card key={org.name}>
                  <Flex align='center' style={{marginBottom:'20px'}}>
                    <Image src={org.img} style={{width:'50%'}} preview={false}/>
                    <Typography.Title level={4}>{org.name}</Typography.Title>
                  </Flex>

                  <Flex justify='space-between' align='center'>
                    <Flex vertical>
                      <Flex><HomeFilled></HomeFilled><Typography.Text style={{marginLeft:'10px'}}>{org.address}</Typography.Text></Flex>
                      <Flex><PhoneFilled></PhoneFilled><Typography.Text style={{marginLeft:'10px'}}>{org.contact}</Typography.Text></Flex>
                    </Flex>
                    
                    <Dropdown
                      overlay={
                        <Menu style={{backgroundColor:COLOR['50']}}>
                          {org.exams.map((exam) => (
                            <Menu.Item key={exam.key}>
                              <Typography.Text style={{color:'black'}}>{exam.label}</Typography.Text>  
                            </Menu.Item>
                          ))}
                        </Menu>
                      } placement='bottom' arrow>
                      
                      <Button style={{backgroundColor:COLOR['500'], color:'white', border:'none'}}>
                        View Exams
                      </Button>
                    </Dropdown>
                  </Flex>
              </Card>
            )}
            </Col>
          ))}
          
      </Row>
    </div>
  );
};