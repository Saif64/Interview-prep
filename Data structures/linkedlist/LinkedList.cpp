#include<bits/stdc++.h>
using namespace std;

struct node{
    int data;
    node *next;
};
node *root=NULL;
void add(int x)
{
    if(root==NULL)
    {
        root=new node();
        root->data=x;
        root->next=NULL;
    }
    else
    {
        node *cur_node=root;
        while(cur_node->next != NULL)   //Find the last node
        {
             cur_node = cur_node->next;    //go to next address
        }
        node *new_node= new node();
        new_node->data=x;
        new_node->next=NULL;
        cur_node->next=new_node;      //link the last node with new node
    }
}

void print()
{
    node *cur_node=root;
    while(cur_node!=NULL) //loop until you reach null
    {
        cout<<(cur_node->data)<<" ";
        cur_node=cur_node->next;
    }
}

void deleteNode(int x)
{
    node *cur_node=root;
    node *prev_node=root;
    while(cur_node->data!=x)
    {
        prev_node=cur_node;
        cur_node=cur_node->next;
    }
    if(cur_node==root)
    {
        node *temp=cur_node;
        root=root->next;
        delete(temp);
    }
    else
    {
        prev_node->next=cur_node->next;
        delete(cur_node);
    }
}
int main()
{
    add(1);
    add(11);
    add(111);
    add(1111);
    print();
    deleteNode(111);
    print();
}
