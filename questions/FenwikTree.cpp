vector<int> tree;
void update(int idx,int n,int x)
{
    while(idx<=n)
    {
        tree[idx]+=x;
        idx+= idx&(-idx);
    }
}
int query(int idx){
    int sum=0;
    while(idx>0)
    {
        sum+=tree[idx];
        idx-=idx&(-idx);
    }
    return sum;
}
